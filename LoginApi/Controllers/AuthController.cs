using LoginApi.Models;
using LoginApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LoginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseService _db;

        public AuthController(DatabaseService db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _db.GetUserAsync(user.Username, user.Password);
            if (existingUser == null)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(existingUser);
        }
    }
}
