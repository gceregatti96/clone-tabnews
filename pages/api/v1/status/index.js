import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  //consulta ao banco de dados
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const dataBaseOpenedConnectionsResult = await database.query(
    "SELECT * FROM pg_stat_activity WHERE datname = 'local_db';"
  );
  const dataBaseOpenedConnectionsValue = dataBaseOpenedConnectionsResult.rows.length;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: dataBaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
