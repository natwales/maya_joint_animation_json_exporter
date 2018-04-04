const Scene = require('Scene');
const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const Reactive = require('Reactive');

const origJSON = {}; //paste exported json exported here
const startFrame = 1; //copy first frame exported here.
const numFrames = 298; //copy number of frames exported here.

const animationDict = JSON.parse(origJSON);
const frameDriver   = Animation.timeDriver({durationMilliseconds: 6933, loopCount:Infinity});

for (jointKey in animationDict) {
    try  {
        const joint = Scene.root.find(jointKey);
        const jointTrans = joint.transform;
        var jd = {tx:[],ty:[],tz:[],rx:[],ry:[],rz:[]};
        //TODO: parse out frame range vs using Start and NumFrames
        for( var i = startFrame; i < numFrames; i++) {
            const frameDict = animationDict[jointKey][i];
            jd.tx.push(Animation.samplers.constant(parseFloat(frameDict.tx)));
            jd.ty.push(Animation.samplers.constant(parseFloat(frameDict.ty)));
            jd.tz.push(Animation.samplers.constant(parseFloat(frameDict.tz)));
            jd.rx.push(Animation.samplers.constant(parseFloat(frameDict.rx) * Math.PI / 180));
            jd.ry.push(Animation.samplers.constant(parseFloat(frameDict.ry) * Math.PI / 180));
            jd.rz.push(Animation.samplers.constant(parseFloat(frameDict.rz) * Math.PI / 180));
        }
        
        const txSampler = Animation.samplers.sequence({samplers:jd.tx});
        const tySampler = Animation.samplers.sequence({samplers:jd.ty});
        const tzSampler = Animation.samplers.sequence({samplers:jd.tz});
        const rxSampler = Animation.samplers.sequence({samplers:jd.rx});
        const rySampler = Animation.samplers.sequence({samplers:jd.ry});
        const rzSampler = Animation.samplers.sequence({samplers:jd.rz});

        jointTrans.x = Animation.animate(frameDriver,txSampler);
        jointTrans.y = Animation.animate(frameDriver,tySampler);
        jointTrans.z = Animation.animate(frameDriver,tzSampler);
        jointTrans.rotationX = Animation.animate(frameDriver,rxSampler);
        jointTrans.rotationY = Animation.animate(frameDriver,rySampler);
        jointTrans.rotationZ = Animation.animate(frameDriver,rzSampler);
        
    } catch(err) {
       Diagnostics.log(err);
       continue;
    }
}

frameDriver.start();
