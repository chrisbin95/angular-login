using LoginApi.Models;
using MySqlConnector;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace LoginApi.Services
{
    public class DatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<User?> GetUserAsync(string username, string password, string role)
        {
            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync();

            string query = "SELECT username, role FROM users WHERE username=@username AND password=@password AND role=@role";
            using var cmd = new MySqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@role", role);

            using var reader = await cmd.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new User
                {
                    Username = reader.GetString("username"),
                    Role = reader.GetString("role")
                };
            }
            return null;
        }
    }
}
