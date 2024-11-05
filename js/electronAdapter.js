// https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/types/comfy.d.ts
import { app } from "../../scripts/app.js";

app.registerExtension({
  name: "Comfy.ElectronAdapter",
  settings: [
    {
      id: "Comfy-Desktop.AutoUpdate",
      category: ["Comfy-Desktop", "General", "AutoUpdate"],
      name: "Automatically check for updates",
      type: "boolean",
      defaultValue: true,
      onChange(newValue, oldValue) {
        if (oldValue !== undefined && newValue !== oldValue) {
          window["electronAPI"]?.restartApp?.(
            "Restart ComfyUI to apply changes.",
            1500 // add delay to allow changes to take effect before restarting.
          );
        }
      },
    },
  ],

  commands: [
    {
      id: "Comfy-Desktop.OpenLogsFolder",
      label: "Open Logs Folder",
      icon: "pi pi-folder-open",
      function() {
        window["electronAPI"]?.openLogsFolder?.();
      },
    },
  ],

  menuCommands: [
    {
      path: ["Help"],
      commands: ["Comfy-Desktop.OpenLogsFolder"],
    },
  ],
});
