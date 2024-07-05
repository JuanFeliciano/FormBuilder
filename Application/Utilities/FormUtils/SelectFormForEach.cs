using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Utilities.FormUtils
{
    public class SelectFormForEach
    {
        private readonly IDatabaseService _dbService;
        private readonly IServices<Forms> _formsServices;

        public SelectFormForEach(IDatabaseService dbService, IServices<Forms> forms)
        {
            _dbService = dbService;
            _formsServices = forms;
        }

        public async Task<List<Forms>> FormSelect(int id)
        {
            List<Forms> dataForms = await _formsServices.GetById(id);

            foreach (Forms form in dataForms)
            {
                string selectForm = "SELECT * FROM Forms WHERE Forms.Id = @Id;";
                SqlParameter[] selectFormParameter = { new("@Id", id) };
                DataTable selectResultForm = await _dbService.ExecuteQueryAsync(selectForm, selectFormParameter);

                foreach (Questions question in form.Questions)
                {
                    string selectQuestion = "SELECT * FROM Questions WHERE Questions.IdForm = @Id;";
                    SqlParameter[] selectQuestionParameter = { new("@Id", id) };
                    DataTable selectResultQuestion = await _dbService.ExecuteQueryAsync(selectQuestion, selectQuestionParameter);
                }
            }

            return dataForms;
        }
    }
}
