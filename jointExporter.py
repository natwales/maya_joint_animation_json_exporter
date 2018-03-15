from maya import cmds
import json
import os

def saveSelectedJointsToJsonFile(startTime, endTime, filename = "joints"):
     objects = cmds.ls(selection=True, type="joint", dag=True, long=True)
     joints = {}
     timeRange = range(startTime,endTime+1,1)

     for obj in objects:

         jointDict = {}
         shortName = obj.split("|")[-1]
         attrs = cmds.listAttr(r=True)
         print attrs

         for frame in timeRange:
             tx, ty, tz = cmds.getAttr('%s.translate' % obj, time =frame)[0]
             rx, ry, rz  = cmds.getAttr('%s.rotate' % obj, time=frame)[0]
             ox, oy, oz = cmds.getAttr('%s.jointOrient' % obj, time=frame)[0]

             frameDict = {}

             frameDict['tx'] = "%.8f" % tx
             frameDict['ty'] = "%.8f" % ty
             frameDict['tz'] = "%.8f" % tz
             frameDict['rx'] = "%.8f" % (rx + ox)
             frameDict['ry'] = "%.8f" % (ry + oy)
             frameDict['rz'] = "%.8f" % (rz + ox)

             jointDict[frame] = frameDict

         joints[shortName] = jointDict

     jsonObject = json.dumps(joints)
     _saveJson(jsonObject, filename)


def _saveJson(jsonObject, filename):
    if ".json" not in filename:
        filename += ".json"

    completeName = os.path.join(os.path.expanduser('~'))
    completeName += "/" + filename;

    with open(completeName, "w") as jsonFile:
        json.dump(jsonObject, jsonFile, indent=2)

    print "Finished writing data to {0}".format(completeName)
