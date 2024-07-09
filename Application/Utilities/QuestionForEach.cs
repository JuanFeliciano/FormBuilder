using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;

namespace MovtechForms.Application.Utilities
{
    public class QuestionForEach : IForEach<Questions>
    {
        private readonly IDatabaseService _dbService;

        public QuestionForEach(IDatabaseService dbService) => _dbService = dbService;

        public async Task SelectForEach([FromBody] Questions question, int id)
        {

        }

        public async Task DeleteForEach(int id)
        {

        }
    }
}
