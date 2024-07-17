using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application;
using MovtechForms.Application.Services.MainServices;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class FormGroupHandler
    {
        private readonly IRepository<FormsGroup> _formGroupRepo;

        public FormGroupHandler(IRepository<FormsGroup> formGroupRepo) => _formGroupRepo = formGroupRepo;


        public async Task<List<FormsGroup>> Get()
        {
            DataTable selectResult = await _formGroupRepo.Get();

            if (selectResult.Rows.Count is 0)
                throw new Exception("There are no Forms Group");

            return selectResult.ConvertDataTableToList<FormsGroup>();
        }

        // GET METHOD
        public async Task<FormsGroup> GetById(int id)
        {
            FormsGroup formGroup = await _formGroupRepo.GetById(id);

            if (formGroup is null)
            {
                throw new Exception("Predicate is invalid");
            }

            return formGroup;
        }

        // POST METHOD
        public async Task<FormsGroup> Post([FromBody] FormsGroup formsGroup)
        {
            if (formsGroup.Forms is null || formsGroup.Forms.Count is 0)
                throw new ArgumentException("The value Forms cannot be null or empty");


            if (string.IsNullOrWhiteSpace(formsGroup.Title.Trim()))
                throw new Exception("The value cannot be null or empty");


            return await _formGroupRepo.Post(formsGroup);
        }

        // DELETE METHOD

        public async Task<FormsGroup> Delete(int id)
        {
            FormsGroup formGroup = await _formGroupRepo.Delete(id);

            if (formGroup is null)
                throw new Exception("Invalid id");


            return formGroup;
        }

        // UPDATE METHOD

        public async Task<FormsGroup> Update([FromBody] FormsGroup formGroup, int id)
        {
            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }


            FormsGroup formsGroup = await _formGroupRepo.Update(formGroup, id);

            if (formsGroup is null)
                throw new Exception("Id invalid");


            return formsGroup;
        }
    }
}
