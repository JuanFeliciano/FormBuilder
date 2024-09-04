using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterface._0._0._0._1___SecundaryInterface;

namespace MovtechForms._1___Application._0._4___Controllers._0._0._1___SecundaryControllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class NpsController : ControllerBase
    {
        private readonly INpsService _npsService;

        public NpsController(INpsService npsService) => _npsService = npsService;

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<int> CalculateNps()
        {
            int percentNps = await _npsService.CalculateNps();

            try
            {
                return percentNps;
            }
            catch (Exception)
            {
                throw new Exception($"Fail in calculate Nps Score");
            }

        }
    }
}
