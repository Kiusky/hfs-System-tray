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
        if (err) api.log("Erro ao executar RBTray: " + err.message)
        else api.log("RBTray iniciado com sucesso.")
    })

    api.events.on('dispose', () => {
        exec('taskkill /IM RBTray.exe /F', (err, stdout, stderr) => {
            if (err) {
                api.log("Erro ao finalizar RBTray: " + err.message)
            } else {
                api.log("RBTray encerrado com sucesso.")
            }
        })
    })
}
