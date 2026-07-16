const pool = require('./db');
const prompt = require('prompt-sync')();

async function main() {
  const genero = prompt('Digite o gênero do jogo: ');

  try {
    const query = `
      SELECT titulo, genero, nota, lancamento
      FROM jogos
      WHERE genero ILIKE $1
      ORDER BY nota DESC;
    `;

    const resultado = await pool.query(query, [genero]);

    if (resultado.rowCount === 0) {
      console.log('Nenhum jogo encontrado para o gênero informado.');
    } else {
      console.log(`\n--- Jogos do gênero "${genero}" ---`);
      resultado.rows.forEach((jogo) => {
        console.log(`${jogo.titulo} (${jogo.lancamento}) - Nota: ${jogo.nota}`);
      });

      // Desafio extra: média das notas encontradas, calculada com AVG() direto na query
      const mediaQuery = `
        SELECT AVG(nota) AS media
        FROM jogos
        WHERE genero ILIKE $1;
      `;
      const mediaResultado = await pool.query(mediaQuery, [genero]);
      const media = parseFloat(mediaResultado.rows[0].media).toFixed(2);

      console.log(`\nMédia de nota dos jogos encontrados: ${media}`);
    }
  } catch (err) {
    console.error('Erro ao consultar o banco:', err);
  } finally {
    pool.end();
  }
}

main();