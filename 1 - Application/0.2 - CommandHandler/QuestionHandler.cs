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


        public async Task<List<Question>> Get()
        {
            List<Question> selectResult = await _questionRepo.Get();

            if (selectResult.Count is 0)
                throw new Exception("There are no question");

            return selectResult;
        }

        public async Task<Question> GetById(int id)
        {
            Question question = await _questionRepo.GetById(id);

            if (question is null)
                throw new Exception("Invalid id or no question");


            return question;
        }

        public async Task<Question> Post([FromBody] Question questions)
        {
            if (string.IsNullOrWhiteSpace(questions.Content.Trim()))
                throw new Exception("The content cannot be null or empty");

            return await _questionRepo.Post(questions);
        }

        public async Task<Question> Delete(int id)
        {
            Question questionDelete = await _questionRepo.Delete(id);

            if (questionDelete is null)
                throw new Exception("Invalid id or no questions");

            return questionDelete;
        }

        public async Task<Question> Update([FromBody] Question questions, int id)
        {
            if (string.IsNullOrWhiteSpace(questions.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            return await _questionRepo.Update(questions, id);
        }
    }
}
