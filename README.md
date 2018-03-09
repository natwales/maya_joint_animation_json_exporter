# maya_joint_animation_json_exporter
Maya python script to export selected joint animations to json format - primarily for use with Facebook's AR Studio

# usage

Add jointExporter.py to your maya scripts directory. On a Mac: /Users/[user]/Library/Preferences/Autodesk/maya/2017/scripts

Within your project open, and all of your joints selected, run the following code in the script editor:

```python
import jointExporter
jointExporter.saveSelectedJointsToJsonFile(1,50,"myJsonFileName")
```

The json file is exported in the following format organized by joint name and then frame# containing all of the translation and rotation values

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