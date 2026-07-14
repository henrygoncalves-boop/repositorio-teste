import pg from 'pg';
const { Client } = pg;

// Configuração da conexão
// São as mesmas informações que você usa no pgAdmin!
const client = new Client({
    host:     'localhost',  // onde o banco está rodando
    port:     5432,         // porta padrão do PostgreSQL
    user:     'postgres',   // usuário do banco
    password: 'root',  // a mesma senha que você usa no pgAdmin
    database: 'alquimista_db' // o banco que criamos agora pouco
});


async function listarItens() {

    try {

        await client.connect();

        const resultado = await client.query(
            'SELECT * FROM itens ORDER BY tipo, nome'
        );

        console.log('\n╔════════════════════════════════════════════════════╗');
        console.log('║         ⚗️  LOJA DO ALQUIMISTA VALDRIS              ║');
        console.log('╚════════════════════════════════════════════════════╝\n');

        if (resultado.rows.length === 0) {
            console.log('A loja está vazia no momento.');
        } else {
            resultado.rows.forEach(item => {
                console.log(`[${item.id}] ${item.nome}`);
                console.log(`    Tipo: ${item.tipo} | Preço: R$ ${item.preco} | Estoque: ${item.estoque}`);
                console.log(`    ${item.descricao}`);
                console.log('    ─────────────────────────────────────────');
            });
            console.log(`\nTotal de itens: ${resultado.rows.length}`);
        }

    } catch (erro) {

        console.log('❌ Erro ao listar itens:', erro.message);

    } finally {

        await client.end();

    }
}

async function cadastrarItem() {

    try {

        await client.connect();

        console.log('\n⚗️  CADASTRAR NOVO ITEM\n');

        const nome      = prompt('Nome do item: ');
        const tipo      = prompt('Tipo (Poção/Ingrediente/Elixir): ');
        const preco     = prompt('Preço: ');
        const estoque   = prompt('Estoque inicial: ');
        const descricao = prompt('Descrição: ');

        // Validação básica antes de ir ao banco
        if (!nome || !tipo || !preco) {
            console.log('❌ Nome, tipo e preço são obrigatórios.');
            return; // sai da função sem ir ao banco
        }

        const resultado = await client.query(
            `INSERT INTO itens (nome, tipo, preco, estoque, descricao)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [nome, tipo, preco, estoque, descricao]
        );

        console.log('\n✅ Item cadastrado com sucesso!');
        console.log(`   ID gerado pelo banco: ${resultado.rows[0].id}`);
        console.log(`   ${resultado.rows[0].nome} adicionado à loja.`);

    } catch (erro) {

        console.log('❌ Erro ao cadastrar item:', erro.message);

    } finally {

        await client.end();

    }
}

cadastrarItem();

//listarItens();