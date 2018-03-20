# maya_joint_animation_json_exporter
Maya python script to export selected joint animations to a json file and example javascript file to run animations in AR Studio.

# usage

Usage demo video here: https://vimeo.com/260300507

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

To playback animations in AR Studio see `ar_studio_usage_example.js`.

UPDATE: Any joints with '_ROOT_' in their name will be exported in world space. This is may be helpful when you want to animate a single full skeleton in Maya while still spliting up animations accross seperate meshes in order to come in under the 20 joint limit per mesh in AR Studio.

# todo

Is is possible to optimize animation playback in ar studio using custom sampler to pull data out of dictionary?
