using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IQuestionRepository _questionRepo;

        public QuestionHandler(IQuestionRepository questionRepo) => _questionRepo = questionRepo;


        public async Task<Questions> Get()
        {
            Questions selectResult = await _questionRepo.Get();

            if (selectResult is null)
                throw new Exception("There are no question");

            return selectResult;
        }

        public async Task<Questions> GetById(int id)
        {
            Questions question = await _questionRepo.GetById(id);

            if (question is null)
                throw new Exception("Invalid id or no question");


            return question;
        }

        public async Task<Questions> Post([FromBody] Questions questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content.Trim()))
                throw new Exception("The content cannot be null or empty");

            return await _questionRepo.Post(questions);
        }

        public async Task<Questions> Delete(int id)
        {
            Questions questionDelete = await _questionRepo.Delete(id);

            if (questionDelete is null)
                throw new Exception("Invalid id or no questions");

            return questionDelete;
        }

        public async Task<Questions> Update([FromBody] Questions questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            return await _questionRepo.Update(questions, id);
        }
    }
}
