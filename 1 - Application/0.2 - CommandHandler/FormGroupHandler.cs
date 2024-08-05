using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class FormGroupHandler : IFormGroupHandler
    {
        private readonly IFormGroupRepository _formGroupRepo;

        public FormGroupHandler(IFormGroupRepository formGroupRepo) => _formGroupRepo = formGroupRepo;


        public async Task<List<FormGroup>> Get()
        {
            List<FormGroup> selectResult = await _formGroupRepo.Get();

            if (selectResult.Count is 0)
                throw new Exception("There are no Forms Group");

            return selectResult;
        }

        // GET METHOD
        public async Task<FormGroup> GetById(int id)
        {
            FormGroup formGroup = await _formGroupRepo.GetById(id);

            if (formGroup is null)
            {
                throw new Exception("Predicate is invalid");
            }

            return formGroup;
        }

        // POST METHOD
        public async Task<FormGroup> Post([FromBody] FormGroup formsGroup)
        {
            if (formsGroup.Forms is null || formsGroup.Forms.Count is 0)
                throw new ArgumentException("The value Forms cannot be null or empty");

            foreach (Form forms in formsGroup.Forms)
            {
                if (string.IsNullOrWhiteSpace(forms.Title) || forms.Questions.Count <= 0)
                    throw new Exception("No parameter can be null or empty");

                foreach (Question question in forms.Questions)
                {
                    if (string.IsNullOrWhiteSpace(question.Content))
                        throw new Exception("No parameter can be null or empty");

                    foreach (Answer answer in question.Answers)
                    {
                        if (answer is not null)
                            throw new Exception("Answer parameter need be empty");
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(formsGroup.Title.Trim()))
                throw new Exception("The value cannot be null or empty");


            return await _formGroupRepo.Post(formsGroup);
        }

        // DELETE METHOD

        public async Task<FormGroup> Delete(int id)
        {
            FormGroup formGroup = await _formGroupRepo.Delete(id);

            if (formGroup is null)
                throw new Exception("Invalid id");


            return formGroup;
        }

        // UPDATE METHOD

        public async Task<FormGroup> Update([FromBody] FormGroup formGroup, int id)
        {
            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }


            FormGroup formsGroup = await _formGroupRepo.Update(formGroup, id);

            if (formsGroup is null)
                throw new Exception("Id invalid");


            return formsGroup;
        }
    }
}
