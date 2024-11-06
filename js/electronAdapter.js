// https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/types/comfy.d.ts
import { app } from "../../scripts/app.js";

(async () => {
  const electronAPI = window["electronAPI"];
  if (!electronAPI) return;

  const desktopAppVersion = await electronAPI.getElectronVersion();
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
            electronAPI.restartApp(
              "Restart ComfyUI to apply changes.",
              1500 // add delay to allow changes to take effect before restarting.
            );
          }
        },
      },
    ],

    commands: [
      {
        id: "Comfy-Desktop.Folders.OpenLogsFolder",
        label: "Open Logs Folder",
        icon: "pi pi-folder-open",
        function() {
          electronAPI.openLogsFolder();
        },
      },
      {
        id: "Comfy-Desktop.Folders.OpenModelsFolder",
        label: "Open Models Folder",
        icon: "pi pi-folder-open",
        function() {
          electronAPI.openModelsFolder();
        },
      },
      {
        id: "Comfy-Desktop.Folders.OpenOutputsFolder",
        label: "Open Outputs Folder",
        icon: "pi pi-folder-open",
        function() {
          electronAPI.openOutputsFolder();
        },
      },
      {
        id: "Comfy-Desktop.Folders.OpenInputsFolder",
        label: "Open Inputs Folder",
        icon: "pi pi-folder-open",
        function() {
          electronAPI.openInputsFolder();
        },
      },
      {
        id: "Comfy-Desktop.Folders.OpenCustomNodesFolder",
        label: "Open Custom Nodes Folder",
        icon: "pi pi-folder-open",
        function() {
          electronAPI.openCustomNodesFolder();
        },
      },
      {
        id: "Comfy-Desktop.Folders.OpenModelConfig",
        label: "Open extra_model_paths.yaml",
        icon: "pi pi-file",
        function() {
          electronAPI.openModelConfig();
        },
      },
      {
        id: "Comfy-Desktop.OpenDevTools",
        label: "Open DevTools",
        icon: "pi pi-code",
        function() {
          electronAPI.openDevTools();
        },
      },
    ],

    menuCommands: [
      {
        path: ["Help"],
        commands: ["Comfy-Desktop.OpenDevTools"],
      },
      {
        path: ["Help", "Open Folder"],
        commands: [
          "Comfy-Desktop.Folders.OpenLogsFolder",
          "Comfy-Desktop.Folders.OpenModelsFolder",
          "Comfy-Desktop.Folders.OpenOutputsFolder",
          "Comfy-Desktop.Folders.OpenInputsFolder",
          "Comfy-Desktop.Folders.OpenCustomNodesFolder",
          "Comfy-Desktop.Folders.OpenModelConfig",
        ],
      },
    ],

    aboutPageBadges: [
      {
        label: "ComfyUI_Desktop " + desktopAppVersion,
        url: "https://github.com/Comfy-Org/electron",
        icon: "pi pi-github",
      },
    ],
  });
})();
