import * as vscode from 'vscode';
const fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "language-tracker" is now active!');

    let languages: { [key: string]: number } = {};
    var oldText = "";
    var newText = "";

    setInterval(() => {
        if (fs.existsSync('languages.json')) {
            languages = JSON.parse(fs.readFileSync('languages.json'));
        }
        const currentLanguage = vscode.window.activeTextEditor?.document.languageId ?? '';

        if (currentLanguage !== '') {
            if (languages[currentLanguage]) {
                languages[currentLanguage] += 2;
            } else {
                languages[currentLanguage] = 2;
            }

            const hours = Math.round((languages[currentLanguage] / 3600) * 10) / 10;
            newText = `${currentLanguage}: ${hours}h`
            if (oldText !== newText) {
                oldText = `${currentLanguage}: ${hours}h`
                vscode.window.showInformationMessage(oldText);
            }
            fs.writeFileSync('languages.json', JSON.stringify(languages));
        }
    }, 2000);
}

export function deactivate() { }