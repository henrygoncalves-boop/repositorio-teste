import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});

async function contagemAlunos() {

    try{
        await client.connect();

        const totalAlunos = await client.query('SELECT COUNT(*)AS total FROM alunos');
        console.log("Total de Alunos", totalAlunos.rows[0].total);

        const mediaAlunos = awaitclient.query('SELECT AVG(nota) AS media FROM alunos');
        console.log("Media Geral da Turma: ", mediaAlunos.rows[0].media);

    }catch (erro){

        console.log("❌ Ocorreu um erro:", erro.message);

        }finally{
            await client.end();
            console.log("Conexão encerrada.");
        }


    }


    contagemAlunos();
