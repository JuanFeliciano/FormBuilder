using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupFormController : ControllerBase
    {
        private readonly IDatabaseService _dbService;

        public GroupFormController(IDatabaseService dbService)
        {
            _dbService = dbService ?? throw new ArgumentNullException(nameof(dbService));
        }


        [HttpGet]
        public async Task<IActionResult> GetGroupForm()
        {
            try
            {
                string query = "SELECT * FROM FormsGroup;";
                DataTable result = await _dbService.ExecuteQueryAsync(query, null!);

                var data = result.AsEnumerable().Select(row => new
                {
                    Id = row["Id"],
                    Title = row["Title"]
                }).ToList();

                return Ok(data);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Erro ao consultar dados: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostGroupForm([FromBody] FormsGroup formGroup)
        {
            try
            {
                string query = "INSERT INTO FormsGroup (Title) VALUES (@Title);";
                SqlParameter[] parameters =
                    {
                        new("@Title", formGroup.Title)
                    };
                int result = await _dbService.ExecuteQueryNonAsync(query, parameters);

                return StatusCode(201, result);



            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Erro ao criar novo grupo: {ex.Message}");
            }
        }
    }
}
