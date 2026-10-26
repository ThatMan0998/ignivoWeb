import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, validatePartnershipContact, classifyContactError } from '../src/lib/contact-input.mjs';

const submissionId = '123e4567-e89b-42d3-a456-426614174000';

test('normalizes consultation input without requiring optional fields', () => {
  assert.deepEqual(validateContact({ fullName: '  Khách thử nghiệm  ', phoneNumber: '+84 900-000-000', submissionId }).values, {
    fullName: 'Khách thử nghiệm', phoneNumber: '+84900000000', email: '', message: '', submissionId,
  });
});
test('rejects malformed input before reaching SQL', () => {
  for (const input of [null, [], {}, { fullName: {}, phoneNumber: '0900000000' }, { fullName: '   ', phoneNumber: '0900000000' }]) {
    assert.ok(validateContact(input).error);
  }
});
test('rejects values exceeding schema limits and invalid contact details', () => {
  const valid = { fullName: 'Test', phoneNumber: '0900000000', submissionId };
  for (const patch of [{ fullName: 'x'.repeat(101) }, { phoneNumber: '1'.repeat(16) }, { phoneNumber: 'abcdefghi' }, { email: 'invalid' }, { email: 'a'.repeat(100) + '@example.com' }, { message: 'x'.repeat(5001) }]) {
    assert.ok(validateContact({ ...valid, ...patch }).error);
  }
});

test('stores company and individual proposals with their selected contact details', () => {
  const base = { fullName: 'Lan', phoneNumber: '0900000000', email: 'lan@example.com', collaborationArea: 'technology', message: 'Muốn tích hợp hệ thống.', submissionId };
  const company = validatePartnershipContact({ ...base, partnerType: 'company', organizationName: 'Công ty A', role: 'Giám đốc' });
  assert.match(company.values.message, /Loại đối tác: Công ty \/ tổ chức/);
  assert.match(company.values.message, /Công ty \/ tổ chức: Công ty A/);
  assert.match(company.values.message, /Đề xuất hợp tác:\nMuốn tích hợp hệ thống\./);

  const individual = validatePartnershipContact({ ...base, partnerType: 'individual', role: 'Kỹ sư' });
  assert.match(individual.values.message, /Loại đối tác: Cá nhân/);
  assert.doesNotMatch(individual.values.message, /Công ty \/ tổ chức:/);
});

test('rejects incomplete partnership requests on the server', () => {
  const valid = { fullName: 'Lan', phoneNumber: '0900000000', email: 'lan@example.com', partnerType: 'company', organizationName: 'Công ty A', collaborationArea: 'technology', message: 'Đề xuất tích hợp.', submissionId };
  for (const patch of [{ partnerType: 'unknown' }, { organizationName: '' }, { collaborationArea: 'unknown' }, { email: '' }, { message: '' }]) {
    assert.ok(validatePartnershipContact({ ...valid, ...patch }).error);
  }
});
test('distinguishes configuration, connectivity and missing database table', () => {
  assert.equal(classifyContactError({ code: 'DB_CONFIG' }), 'CONTACT_CONFIG');
  for (const code of ['ELOGIN', 'ESOCKET', 'ETIMEOUT']) assert.equal(classifyContactError({ code }), 'CONTACT_DATABASE');
  assert.equal(classifyContactError({ code: 'EREQUEST', originalError: { info: { number: 208 } } }), 'CONTACT_SCHEMA');
  assert.equal(classifyContactError({ code: 'EREQUEST', number: 229 }), 'CONTACT_SAVE');
});
