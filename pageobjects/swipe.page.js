const path = require('path');
const allure = require('@wdio/allure-reporter').default;

class SwipePage {
    // 🎯 Seletores de Acessibilidade
    get swipeMenuButton() { return $(`//android.widget.TextView[@text="󰤼"]`); }
    get greatCommunity() { return $('//android.view.ViewGroup[@resource-id="__CAROUSEL_ITEM_1__"]'); }
    get swipeHorizontal() { return $(`//android.widget.TextView[@text="Swipe horizontal"]`); }

    async tirarPrintAllure(nomeDoAnexo) {
        const screenshot = await driver.takeScreenshot();
        allure.addAttachment(nomeDoAnexo, Buffer.from(screenshot, 'base64'), 'image/png');
        console.log(`Evidência anexada ao Allure: ${nomeDoAnexo}`);
    }

    async navegarParaSwipe() {
        await this.swipeMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.swipeMenuButton.click();
    }

    get carrosselContainer() {
        return $('android=new UiSelector().resourceId("Carousel")');
    }

    // async swipeAteOCard(textoDoCard, descricaoDoCard) {
    //     const container = await this.carrosselContainer;
    //     await container.waitForExist({ timeout: 10000 });

    //     // Coleta as dimensões com base no container dinâmico
    //     const location = await container.getLocation();
    //     const size = await container.getSize();

    //     // Linha central vertical estável
    //     const centerY = Math.round(location.y + (size.height / 2));

    //     // Coordenadas calibradas estáveis (Direita para Esquerda)
    //     const startX = Math.round(location.x + (size.width * 0.85));
    //     const endX = Math.round(location.x + (size.width * 0.15));

    //     console.log(`[SwipePage] Iniciando busca focada para o card: "${textoDoCard}"`);

    //     let tentativas = 0;
    //     const maxTentativas = 5;
    //     let encontrado = false;

    //     while (tentativas < maxTentativas) {
    //         // Instancia o seletor a cada volta para ler o estado atual do DOM do Android
    //         const cardAlvo = await $(`android=new UiSelector().text("${textoDoCard}")`);

    //         // isExisting pega o elemento mesmo se ele estiver 1% visível na borda direita
    //         if (await cardAlvo.isExisting()) {
    //             console.log(`✓ Card "${textoDoCard}" entrou no radar da tela! Aplicando empurrão final...`);

    //             // ARRRASTO DE AJUSTE CRUCIAL: Traz mais 30% do carrossel para centralizar o alvo
    //             const startXCurto = Math.round(location.x + (size.width * 0.70));
    //             const endXCurto = Math.round(location.x + (size.width * 0.40));

    //             await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    //                 .move({ duration: 0, x: startXCurto, y: centerY })
    //                 .down({ button: 0 })
    //                 .move({ duration: 1000, x: endXCurto, y: centerY })
    //                 .up({ button: 0 })
    //                 .perform();

    //             await browser.pause(2000); // Aguarda o carrossel estabilizar no meio da tela
    //             encontrado = true;
    //             break; // Encontrou e centralizou, sai do loop imediatamente!
    //         }

    //         // Se ainda não achou o card no DOM, executa o seu swipe longo padrão
    //         console.log(`[SwipePage] Avançando carrossel... Tentativa ${tentativas + 1}/${maxTentativas}`);
    //         await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    //             .move({ duration: 0, x: startX, y: centerY })
    //             .down({ button: 0 })
    //             .move({ duration: 1200, x: endX, y: centerY })
    //             .up({ button: 0 })
    //             .perform();

    //         await browser.pause(2000);
    //         tentativas++;
    //     }

    //     // Validação final e clique no elemento estavelmente posicionado
    //     const elementoFinal = await $(`android=new UiSelector().text("${textoDoCard}")`);
    //     await elementoFinal.waitForDisplayed({
    //         timeout: 6000,
    //         timeoutMsg: `Não foi possível fixar o card "${textoDoCard}" de forma visível na tela.`
    //     });

    //     await elementoFinal.click();
    //     await browser.pause(2000);

    //     console.log(`✓ Sucesso absoluto! O card "${textoDoCard}" foi centralizado e clicado.`);

    //     const textoElemento = await $(`android=new UiSelector().text("${textoDoCard}")`);
    //     await textoElemento.waitForDisplayed({
    //         timeout: 10000,
    //         reverse: false, // false significa: espera até aparecer (true esperaria sumir)
    //         timeoutMsg: 'O elemento "Swipe horizontal" não ficou visível a tempo!'
    //     });
    //         const elementoDescricao = await $(`//android.widget.TextView[@text="${descricaoDoCard}"]`);
    //         // const elementoDescricao = await $(`//android.widget.TextView[@text="WebdriverIO has a great community that supports all members."]`);
    //         await elementoDescricao.waitForExist({ timeout: 3000 });
    //         const textoReal = await elementoDescricao.getText();
            
    //         // Se o texto capturado for igual ao parâmetro enviado, o teste passa direto!
    //         expect(textoReal).to.equal(descricaoDoCard);
    //         console.log(`Texto do elemento: ` + textoReal);
    //         console.log(`Texto da descrição do card: ` + textoReal);
    //         console.log(`✓ Texto descritivo validado com sucesso!`);
    //     // }
    // }


async swipeAteOCard(textoDoCard, descricaoDoCard) {
        const container = await this.carrosselContainer;
        await container.waitForExist({ timeout: 10000 });

        // Coleta as dimensões com base no container dinâmico
        const location = await container.getLocation();
        const size = await container.getSize();

        // Linha central vertical estável
        const centerY = Math.round(location.y + (size.height / 2));

        // Coordenadas calibradas estáveis (Direita para Esquerda)
        const startX = Math.round(location.x + (size.width * 0.85));
        const endX = Math.round(location.x + (size.width * 0.15));

        console.log(`[SwipePage] Iniciando busca focada para o card: "${textoDoCard}"`);

        let tentativas = 0;
        const maxTentativas = 5;
        let encontrado = false;

        // 🔥 FCO TOTAL AQUI: Se o card escolhido for o primeiro, não faz o swipe e vai direto pro clique
        if (textoDoCard === 'FULLY OPEN SOURCE') {
            console.log(`✨ [SwipePage] O card escolhido é o primeiro ("FULLY OPEN SOURCE"). Ignorando o carrossel.`);
            encontrado = true; 
        }

        // SEU CÓDIGO ORIGINAL (100% INTACTO): Ele só roda se NÃO for o primeiro card
        while (tentativas < maxTentativas && !encontrado) {
            // Instancia o seletor a cada volta para ler o estado atual do DOM do Android
            const cardAlvo = await $(`android=new UiSelector().text("${textoDoCard}")`);

            // isExisting pega o elemento mesmo se ele estiver 1% visível na borda direita
            if (await cardAlvo.isExisting()) {
                console.log(`✓ Card "${textoDoCard}" entrou no radar da tela! Aplicando empurrão final...`);

                // ARRRASTO DE AJUSTE CRUCIAL: Traz mais 30% do carrossel para centralizar o alvo
                const startXCurto = Math.round(location.x + (size.width * 0.70));
                const endXCurto = Math.round(location.x + (size.width * 0.40));

                await browser.action('pointer', { parameters: { pointerType: 'touch' } })
                    .move({ duration: 0, x: startXCurto, y: centerY })
                    .down({ button: 0 })
                    .move({ duration: 1000, x: endXCurto, y: centerY })
                    .up({ button: 0 })
                    .perform();

                await browser.pause(2000); // Aguarda o carrossel estabilizar no meio da tela
                encontrado = true;
                break; // Encontrou e centralizou, sai do loop imediatamente!
            }

            // Se ainda não achou o card no DOM, executa o seu swipe longo padrão
            console.log(`[SwipePage] Avançando carrossel... Tentativa ${tentativas + 1}/${maxTentativas}`);
            await browser.action('pointer', { parameters: { pointerType: 'touch' } })
                .move({ duration: 0, x: startX, y: centerY })
                .down({ button: 0 })
                .move({ duration: 1200, x: endX, y: centerY })
                .up({ button: 0 })
                .perform();

            await browser.pause(2000);
            tentativas++;
        }

        // Validação final e clique no elemento estavelmente posicionado
        const elementoFinal = await $(`android=new UiSelector().text("${textoDoCard}")`);
        await elementoFinal.waitForDisplayed({
            timeout: 6000,
            timeoutMsg: `Não foi possível fixar o card "${textoDoCard}" de forma visível na tela.`
        });

        await elementoFinal.click();
        await browser.pause(2000);

        console.log(`✓ Sucesso absoluto! O card "${textoDoCard}" foi centralizado e clicado.`);

        const textoElemento = await $(`android=new UiSelector().text("${textoDoCard}")`);
        await textoElemento.waitForDisplayed({
            timeout: 10000,
            reverse: false, 
            timeoutMsg: 'O elemento "Swipe horizontal" não ficou visível a tempo!'
        });
        
        const elementoDescricao = await $(`//android.widget.TextView[@text="${descricaoDoCard}"]`);
        await elementoDescricao.waitForExist({ timeout: 3000 });
        const textoReal = await elementoDescricao.getText();
        
        expect(textoReal).to.equal(descricaoDoCard);
        console.log(`Texto do elemento: ` + textoReal);
        console.log(`Texto da descrição do card: ` + textoReal);
        console.log(`✓ Texto descritivo validado com sucesso!`);
    }
}

module.exports = new SwipePage();