import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Built from local geometry: no external model or texture requests.
export function createIgnivoRoom(host, { onSelect, onAngle, onContextLost }) {
 const scene=new T.Scene();
 const view=new T.PerspectiveCamera(38,1,0.1,80);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.domElement.setAttribute('role','img');
 renderer.domElement.setAttribute('aria-label','Căn phòng 3D có bộ IGNIVO AI và IoT, Edge Box AI Raspberry Pi 5 và người dùng cầm điện thoại bằng hai tay. Đường truyền đến điện thoại lần lượt xuất hiện khi mô phỏng cháy.');
 host.append(renderer.domElement);
 const palette={'--muted':'#252c39','--border':'#526078','--muted-foreground':'#64748b','--card':'#e0e9f5','--foreground':'#121a28','--viz-series-1':'#00c2ff','--orange':'#ff713e'};
 const color=token=>new T.Color(palette[token]);
 const materials=[];
 function mat(token,options={}){const m=new T.MeshStandardMaterial({color:color(token),roughness:0.75,...options});materials.push([m,token]);return m}
 const floorMat=mat('--muted'), wallMat=mat('--border'), furniture=mat('--muted-foreground'), white=mat('--card'), dark=mat('--foreground'), accent=mat('--viz-series-1'), alertMat=mat('--orange',{emissive:color('--orange'),emissiveIntensity:0.45});
 const glass=mat('--viz-series-1',{transparent:true,opacity:0.12,depthWrite:false,side:T.DoubleSide});
 const room=new T.Group();scene.add(room);
 function box(w,h,d,x,y,z,m,parent=room){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function sphere(r,x,y,z,m,parent=room){const o=new T.Mesh(new T.SphereGeometry(r,20,16),m);o.position.set(x,y,z);parent.add(o);return o}
 function cylinder(r,h,x,y,z,m,parent=room){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,32),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
 box(7.2,.25,5.5,0,-.15,0,floorMat);
 box(7.2,.12,5.5,0,-.33,0,accent);
 const back=box(7.2,2.5,.12,0,1.15,-2.7,wallMat);
 const left=box(.12,2.5,5.5,-3.55,1.15,0,wallMat);
 back.material=wallMat.clone();left.material=wallMat.clone();
 back.material.transparent=left.material.transparent=true;
 // Floor joints, desk, chair, lounge, shelving, planter.
 for(let x=-3;x<=3;x++)box(.012,.005,5.3,x,-.018,0,wallMat);
 for(let z=-2;z<=2;z++)box(7,.005,.012,0,-.018,z,wallMat);
 box(2.2,.14,.95,.8,.9,-1.2,white);
 for(const x of [-.15,1.75])for(const z of [-1.57,-.83])box(.07,.9,.07,x,.43,z,furniture);
 box(.92,.58,.07,.7,1.3,-1.45,dark);box(.08,.2,.08,.7,1,-1.45,furniture);box(.4,.035,.25,.7,.99,-1.43,furniture);
 box(.65,.035,.23,.7,.99,-1.04,furniture);
 cylinder(.1,.21,1.5,1.06,-1.15,accent);
 box(.7,.14,.7,.7,.52,-.12,furniture);box(.7,.68,.13,.7,.88,.23,furniture);cylinder(.06,.5,.7,.23,-.1,dark);
 box(1.15,.45,2.2,-2.6,.3,.25,furniture);box(.25,.75,2.2,-3.05,.58,.25,white);
 for(const z of [-.34,.65])box(.82,.14,.85,-2.46,.59,z,white);
 box(1.1,.08,.8,-1.1,.42,.6,white);for(const x of [-1.5,-.7])box(.05,.42,.55,x,.19,.6,furniture);
 box(1.2,1.65,.4,2.65,.8,-2.38,furniture);
 for(const y of [.35,.87,1.4]){box(1.12,.06,.45,2.65,y,-2.32,white);for(let j=0;j<4;j++)box(.13,.31,.23,2.3+j*.18,y+.18,-2.3,j===2?accent:floorMat)}
 cylinder(.24,.4,2.65,.2,1.83,white);
 for(let i=0;i<7;i++){const o=sphere(.23,2.65+Math.cos(i*2.4)*.21,.65+i*.065,1.83+Math.sin(i*2.4)*.18,furniture);o.scale.set(.7,1.6,.6)}
 // Devices remain accessible via buttons as well as direct selection.
 const devices={}, hitObjects=[];
 function device(id,x,y,z){const g=new T.Group();g.position.set(x,y,z);g.userData.device=id;room.add(g);devices[id]=g;return g}
 // Reference concept: circular ceiling-mounted IoT body above a dome camera.
 // The roof is omitted so the integrated enclosure remains visible.
 const unit=device('ignivo',-.9,2.15,-.6);
 cylinder(.63,.07,0,.315,0,white,unit);
 cylinder(.65,.35,0,.105,0,white,unit);
 cylinder(.60,.07,0,-.105,0,white,unit);
 const unitIndicator=cylinder(.653,.024,0,.005,0,accent,unit);
 // Curved intake slots around the upper sensor housing.
 for(const azimuth of [.3,1.85,3.4,4.95]){
   for(const y of [.09,.155,.22]){
     const vent=new T.Mesh(new T.CylinderGeometry(.654,.654,.028,16,1,true,azimuth,.65),dark);
     vent.position.y=y;
     unit.add(vent);
   }
 }
 cylinder(.48,.12,0,-.19,0,white,unit);
 const rim=new T.Mesh(new T.TorusGeometry(.46,.035,10,48),white);
 rim.rotation.x=Math.PI/2;rim.position.y=-.25;unit.add(rim);
 const domeMaterial=mat('--card',{transparent:true,opacity:.22,roughness:.08,metalness:.25,depthWrite:false,side:T.DoubleSide});
 const dome=new T.Mesh(new T.SphereGeometry(.46,40,24,0,Math.PI*2,Math.PI/2,Math.PI/2),domeMaterial);
 dome.position.y=-.25;unit.add(dome);
 const cameraHead=new T.Group();cameraHead.position.y=-.32;unit.add(cameraHead);
 sphere(.27,0,0,0,dark,cameraHead);
 const lens=cylinder(.14,.08,0,0,.235,furniture,cameraHead);lens.rotation.x=Math.PI/2;
 const lensGlass=cylinder(.105,.09,0,0,.27,dark,cameraHead);lensGlass.rotation.x=Math.PI/2;
 sphere(.035,-.035,.025,.32,accent,cameraHead);
 for(const x of [-.19,.19])sphere(.046,x,-.10,.19,white,cameraHead);
 const end=new T.Vector3(1.4,.35,-1.1);
 const headPosition=unit.position.clone().add(cameraHead.position);
 cameraHead.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),end.clone().sub(headPosition).normalize());
 unit.updateWorldMatrix(true,true);
 const start=cameraHead.localToWorld(new T.Vector3(0,0,.34));
 // Stylized Raspberry Pi enclosure on the top shelf.
 const edge=device('edge',2.65,1.82,-2.32);
 box(.7,.25,.42,0,0,0,dark,edge);
 box(.65,.025,.38,0,.14,0,furniture,edge);
 for(let i=0;i<5;i++)box(.035,.008,.25,-.2+i*.1,.16,0,dark,edge);
 for(const x of [-.18,.02])box(.12,.09,.025,x,0,.22,white,edge);
 const edgeIndicator=sphere(.04,.24,0,.23,accent,edge);
 // A stylized user holds the phone with both hands in front of their chest.
 const person=new T.Group();person.position.set(.9,0,1.65);room.add(person);
 const skin=new T.MeshStandardMaterial({color:'#c79573',roughness:.9});
 const shirt=new T.MeshStandardMaterial({color:'#2386b5',roughness:.85});
 materials.push([skin],[shirt]);
 function limb(from,to,radius,material){
   const a=new T.Vector3(...from),b=new T.Vector3(...to);
   const mesh=cylinder(radius,a.distanceTo(b),0,0,0,material,person);
   mesh.position.copy(a).add(b).multiplyScalar(.5);
   mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.sub(a).normalize());
   return mesh;
 }
 for(const side of [-1,1]){
   box(.20,.12,.34,side*.15,.07,.07,dark,person);
   limb([side*.15,.15,0],[side*.14,.83,0],.095,furniture);
 }
 const torso=sphere(.3,0,1.13,0,shirt,person);torso.scale.set(1,1.35,.62);torso.castShadow=true;
 cylinder(.075,.17,0,1.49,0,skin,person);
 const head=new T.Group();head.position.set(0,1.67,.035);head.rotation.x=.28;person.add(head);
 const face=sphere(.19,0,0,0,skin,head);face.scale.set(.9,1.12,.93);face.castShadow=true;
 const hair=new T.Mesh(new T.SphereGeometry(.194,20,12,0,Math.PI*2,0,Math.PI/2),dark);hair.position.y=.025;head.add(hair);
 sphere(.035,0,-.025,.176,skin,head);
 for(const x of [-.065,.065])sphere(.014,x,.02,.163,dark,head);
 for(const side of [-1,1]){
   limb([side*.23,1.37,0],[side*.33,1.10,.2],.075,shirt);
   sphere(.07,side*.33,1.10,.2,skin,person);
   limb([side*.33,1.10,.2],[side*.13,1.12,.46],.052,skin);
   sphere(.067,side*.13,1.12,.46,skin,person);
 }
 const phone=device('phone',person.position.x,1.15,person.position.z+.46);
 phone.scale.setScalar(.36);
 phone.rotation.set(1.05,Math.PI,0);
 box(.58,1.12,.09,0,0,0,dark,phone);
 const phoneScreen=box(.49,.9,.02,0,0,.06,furniture,phone);
 box(.12,.025,.015,0,.49,.065,white,phone);
 const notification=box(.4,.22,.02,0,.17,.08,alertMat,phone);
 notification.visible=false;
 const phoneLines=new T.Group();phone.add(phoneLines);
 for(const y of [.22,.15])box(.28,.025,.02,0,y,.10,white,phoneLines);
 phoneLines.visible=false;
 for(const [id,g] of Object.entries(devices))g.traverse(o=>{if(o.isMesh){o.userData.device=id;hitObjects.push(o)}});
 person.traverse(o=>{if(o.isMesh){o.userData.device='phone';hitObjects.push(o)}});
 const coverage=new T.Mesh(new T.ConeGeometry(1.1,start.distanceTo(end),32,1,true),glass);
 coverage.position.copy(start).add(end).multiplyScalar(.5);
 coverage.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),start.clone().sub(end).normalize());room.add(coverage);
 const selectRing=new T.Mesh(new T.TorusGeometry(.76,.018,8,48),accent);room.add(selectRing);
 const fire=new T.Group();fire.position.set(1.4,1,-1.1);room.add(fire);fire.visible=false;
 for(let i=0;i<6;i++){const flame=new T.Mesh(new T.ConeGeometry(.10+i*.007,.36+(i%3)*.16,9),alertMat);flame.position.set(Math.cos(i*2)*.16,.18,Math.sin(i*2)*.12);flame.rotation.z=(i-3)*.08;fire.add(flame)}
 const smokeMat=mat('--muted-foreground',{transparent:true,opacity:.32,depthWrite:false});
 for(let i=0;i<5;i++)sphere(.15+i*.04,Math.sin(i)*.13,.7+i*.22,0,smokeMat,fire);
 function signalPath(points){
   const path=new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineDashedMaterial({color:color('--orange'),dashSize:.13,gapSize:.08}));
   path.computeLineDistances();room.add(path);path.visible=false;return path;
 }
 const unitPort=unit.position.clone().add(new T.Vector3(0,0,.4));
 const edgePort=edge.position.clone().add(new T.Vector3(0,0,.25));
 const detectionRoute=signalPath([fire.position,unitPort]);
 const edgeRoute=signalPath([unitPort,edgePort]);
 phone.updateWorldMatrix(true,true);
 const phonePort=phone.localToWorld(new T.Vector3(0,.3,.12));
 const phoneRoute=signalPath([edgePort,new T.Vector3(3.2,2,0),phonePort]);
 scene.add(new T.HemisphereLight(0xffffff,0x777777,2.4));
 const light=new T.DirectionalLight(0xffffff,3);light.position.set(3,8,5);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-6;light.shadow.camera.right=6;light.shadow.camera.top=6;light.shadow.camera.bottom=-6;scene.add(light);

 const controls = new OrbitControls(view, renderer.domElement);
 controls.target.set(0,.6,0);
 controls.enablePan=false;
 controls.enableZoom=false;
 controls.minPolarAngle=.28;
 controls.maxPolarAngle=1.25;
 let selected='ignivo', disposed=false;
 view.position.set(7,9,10);
 controls.update();
 function draw(){
   if(disposed)return;
   back.material.opacity=view.position.z<0?.15:.7;
   left.material.opacity=view.position.x<0?.15:.7;
   selectRing.position.copy(devices[selected].position);
   selectRing.position.z+=.2;
   selectRing.quaternion.copy(view.quaternion);
   renderer.render(scene,view);
 }
 function changed(){draw();onAngle((Math.round(controls.getAzimuthalAngle()*180/Math.PI)+360)%360)}
 controls.addEventListener('change',changed);
 function resize(){
   const w=host.clientWidth,h=host.clientHeight;
   if(!w||!h)return;
   renderer.setSize(w,h);view.aspect=w/h;
   view.fov=w<400?52:42;view.updateProjectionMatrix();draw();
 }
 const observer=new ResizeObserver(resize);observer.observe(host);
 const canvas=renderer.domElement,ray=new T.Raycaster();
 let press=null;
 function down(e){press={id:e.pointerId,x:e.clientX,y:e.clientY}}
 function up(e){
   if(!press||press.id!==e.pointerId)return;
   const moved=Math.hypot(e.clientX-press.x,e.clientY-press.y)>5;press=null;
   if(moved)return;
   const r=canvas.getBoundingClientRect();
   ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),view);
   const hit=ray.intersectObjects(hitObjects)[0];
   if(hit)onSelect(hit.object.userData.device);
 }
 function cancel(){press=null}
 function lost(e){e.preventDefault();onContextLost()}
 canvas.addEventListener('pointerdown',down);
 canvas.addEventListener('pointerup',up);
 canvas.addEventListener('pointercancel',cancel);
 canvas.addEventListener('webglcontextlost',lost);
 resize();changed();
 return {
   select(id){if(!devices[id])return;selected=id;coverage.visible=id==='ignivo';draw()},
   setPhase(phase){
     fire.visible=phase>0;
     detectionRoute.visible=phase>=2;
     edgeRoute.visible=phase>=3;
     phoneRoute.visible=phase>=4;
     unitIndicator.material=phase>=2?alertMat:accent;
     edgeIndicator.material=phase>=3?alertMat:accent;
     phoneScreen.material=phase>=5?dark:furniture;
     notification.visible=phoneLines.visible=phase>=5;
     draw();
   },
   setAngle(degrees){const offset=view.position.clone().sub(controls.target);const spherical=new T.Spherical().setFromVector3(offset);spherical.theta=degrees*Math.PI/180;view.position.copy(controls.target).add(new T.Vector3().setFromSpherical(spherical));controls.update();draw()},
   setDistance(distance){const offset=view.position.clone().sub(controls.target).setLength(distance);view.position.copy(controls.target).add(offset);controls.update();draw()},
   dispose(){
     disposed=true;observer.disconnect();controls.dispose();
     canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('webglcontextlost',lost);
     const geometries=new Set(),allMaterials=new Set(materials.map(([m])=>m));
     scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])allMaterials.add(m)}});
     geometries.forEach(g=>g.dispose());allMaterials.forEach(m=>m.dispose());
     light.shadow.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();
   }
 };
}
