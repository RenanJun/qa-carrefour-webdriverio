# 📱 Automação Mobile com WebdriverIO & Appium

Este projeto é uma suíte de testes automatizados para aplicativos móveis (Android), desenvolvida utilizando **WebdriverIO** e **Appium** sob o padrão de arquitetura **Page Objects Model (POM)**.

O objetivo do projeto é validar fluxos críticos do aplicativo, como navegação entre telas, preenchimento de formulários e interações com menus laterais dinâmicos.

---

## 🛠️ Tecnologias e Ferramentas

* **Framework:** [WebdriverIO (v8+)](https://webdriver.io/)
* **Driver de Automação:** [Appium](https://appium.io/)
* **Motor Android:** UiAutomator2
* **Linguagem:** JavaScript (Node.js)
* **Asserções:** Chai / WebdriverIO Expectations
* **CI/CD:** GitHub Actions

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

1. **Node.js** (Versão 18 ou superior)
2. **Java JDK** (Versão 11 recomendada)
3. **Android Studio** (com as variáveis de ambiente `$ANDROID_HOME` configuradas: `platform-tools`, `tools`, `emulator`, `cmdline-tools`)
4. **Appium Server** instalado globalmente ou via dependências:
   ```bash
   npm install -g appium
   appium driver install uiautomator2