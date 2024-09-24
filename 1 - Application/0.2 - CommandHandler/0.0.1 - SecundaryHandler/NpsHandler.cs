using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterface._0._0._0._1___SecundaryInterface;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterface._0._0._0._1___SecundaryInterface;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler._0._0._1___SecundaryHandler
{
    public class NpsHandler : INpsHandler
    {
        private readonly INpsRepository _npsRepo;


        public NpsHandler(INpsRepository npsRepo) => _npsRepo = npsRepo;

        public async Task<int> CalculateNps()
        {
            DataTable gradeTable = await _npsRepo.CalculateNps();

            List<Answer> gradeList = gradeTable.ConvertDataTableToList<Answer>();

           

            int gradeLessThanSix = gradeList.Where(i => i.Grade <= 6).Count();
            int gradeGreaterThanEight = gradeList.Where(i => i.Grade > 8).Count();


            float percentLessThanSix = (float)gradeLessThanSix / gradeList.Count * 100;
            float percentGreaterThanEight = (float)gradeGreaterThanEight / gradeList.Count * 100;
            Console.WriteLine($"{percentGreaterThanEight} - ",percentLessThanSix);
            float percentNps = percentGreaterThanEight - percentLessThanSix;

            return Convert.ToInt32(percentNps);
        }
    }
}
