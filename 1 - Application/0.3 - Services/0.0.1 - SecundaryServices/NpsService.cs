using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterface._0._0._0._1___SecundaryInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterface._0._0._0._1___SecundaryInterface;

namespace MovtechForms._1___Application._0._3___Services._0._0._1___SecundaryServices
{
    public class NpsService : INpsService
    {
        private readonly INpsHandler _npsHandler;

        public NpsService(INpsHandler npsHandler) => _npsHandler = npsHandler;


        public async Task<int> CalculateNps()
        {
            return await _npsHandler.CalculateNps();
        }
    }
}
