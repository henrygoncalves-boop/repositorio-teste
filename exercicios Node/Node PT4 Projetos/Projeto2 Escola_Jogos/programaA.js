const pool = require('./db');

async function main() {
  try {
    // Query que já traz só quem está acima da média, calculada com subquery
    const query = `
      SELECT nome, nota
      FROM alunos
      WHERE nota > (SELECT AVG(nota) FROM alunos)
      ORDER BY nota DESC;
    `;

    const resultado = await pool.query(query);

    console.log('--- Alunos acima da média ---');
    resultado.rows.forEach((aluno) => {
      console.log(`${aluno.nome} - Nota: ${aluno.nota}`);
    });

    console.log(`\n${resultado.rowCount} alunos acima da média`);
  } catch (err) {
    console.error('Erro ao consultar o banco:', err);
  } finally {
    pool.end();
  }
}

main();