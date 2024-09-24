using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Application;
using MovtechForms.Application.Services.MainServices;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IQuestionRepository _questionRepo;
        private readonly IFormRepository _formRepo;


        public QuestionHandler(IQuestionRepository questionRepo, IFormRepository formRepo)
        {
            _questionRepo = questionRepo;
            _formRepo = formRepo;
        }


        public async Task<List<Question>> Get()
        {
            List<Question> selectResult = await _questionRepo.Get();

            if (selectResult.Count is 0)
                throw new Exception("There are no question");

            return selectResult;
        }

        public async Task<Question> GetById(int id)
        {
            List<Question> questionList = await _questionRepo.Get();

            bool matchingQuestion = questionList.Exists(i => i.Id == id);

            if (matchingQuestion is false)
                throw new Exception("Invalid id or no question");


            Question question = await _questionRepo.GetById(id);


            return question;
        }

        public async Task<List<Question>> GetByIdForm(int id)
        {
            if (id <= 0)
                throw new Exception("Id parameter invalid");


            DataTable questionTable = await _questionRepo.GetByIdForm(id);
            List<Question> questionList = questionTable.ConvertDataTableToList<Question>();
            Console.WriteLine(questionList);

            return questionList;
        }

        public async Task<List<Question>> Post([FromBody] Question[] questions)
        {
            List<Form> formList = await _formRepo.Get();

            foreach (Question question in questions)
            {
                bool matchingQuestion = formList.Exists(i => i.Id == question.IdForm);


                if (matchingQuestion is false)
                    throw new Exception($"The value IdForm: {question.IdForm} is invalid");

                if (string.IsNullOrWhiteSpace(question.Content.Trim()))
                    throw new Exception("The content cannot be null or empty");
            }

            DataTable questionTable=  await _questionRepo.Post(questions);
            List<Question> questionList = questionTable.ConvertDataTableToList<Question>();

            return questionList;
        }

        public async Task<Question> Delete(int id)
        {
            List<Question> questionList = await _questionRepo.Get();

            bool matchingQuestion = questionList.Exists(i => i.Id == id);

            if (matchingQuestion is false)
                throw new Exception($"The parameter Id: {id} is invalid");


            Question questionDelete = await _questionRepo.Delete(id);


            return questionDelete;
        }

        public async Task<Question> Update([FromBody] Question question, int id)
        {
            List<Question> questionList = await _questionRepo.Get();
            List<Form> formList = await _formRepo.Get();

            bool matchingQuestion = questionList.Exists(i => i.Id == id);
            bool matchingForm = formList.Exists(i => i.Id == question.IdForm);

            if (matchingQuestion is false)
                throw new Exception($"The parameter Id: {question.IdForm} is invalid");


            if (matchingForm is false)
                throw new Exception($"The value IdForm: {question.IdForm} is invalid");


            if (string.IsNullOrWhiteSpace(question.Content))
            {
                throw new Exception("The content cannot be null or empty");
            }

            return await _questionRepo.Update(question, id);
        }
    }
}
