exports.repo = "Kiusky/hfs-System-tray"
exports.version = 0.5
exports.description = "Minimize hfs to system tray with RBtray"
exports.apiRequired = 12.3
exports.preview = ["https://github.com/user-attachments/assets/dcb5ae61-0e0d-4535-ae64-5116a0ffeb11"]

exports.init = api => {
    const { execFile, exec } = api.require('child_process')
    const path = api.require('path')

    const exePath = path.join(__dirname, 'RBTray.exe')

    execFile(exePath, { cwd: path.dirname(exePath) }, err => {
        if (err) api.log("Error running RBTray: " + err.message)
        else api.log("RBTray started successfully.")
    })

    api.events.on('dispose', () => {
        exec('taskkill /IM RBTray.exe /F', (err) => {
            if (err) api.log("Error finalizing RBTray:" + err.message)
            else api.log("RBTray terminated successfully.")
        })

        exec('taskkill /IM RBHook.exe /F', (err) => {
            if (err) api.log("Error finalizing RBHook:" + err.message)
            else api.log("RBHook closed successfully.")
        })
    })
}
