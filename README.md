# maya_joint_animation_json_exporter
Maya python script to export selected joint animations to a json file.

# usage

Add jointExporter.py to your maya scripts directory. 

On a Mac: ```/Users/[user]/Library/Preferences/Autodesk/maya/2017/scripts```

Within your project open, and all of your joints selected, run the following code in the script editor:

```python
import jointExporter
jointExporter.saveSelectedJointsToJsonFile(1,50,"myJsonFileName")
```
The first parameter is the frame you want to start exporting animations at, the second is the last frame of the animation, and the third parameter is the fileName.

The json file will be saved to your user's home directory. The data structure is keyed by joint name first and then frame# which contains all of the translation and rotation values for that joint on that specific frame

```javascript
{
  "joint2": 
    {"1": 
      {"tz": 3.0, "tx": 1.0, "ty": 1.0, "rx": 0.0, "ry": 0.0, "rz": 0.0
    },
    ...
}
```

# todo

Need to test this on the AR Studio side and create script to parse json file and apply animations to joints.
