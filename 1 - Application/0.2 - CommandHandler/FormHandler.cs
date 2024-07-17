using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.RepositoryInterfaces;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;
using System.Data;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class FormHandler
    {
        private readonly IRepository<Forms> _formRepo;
        private readonly IDatabaseService _dbService;

        public FormHandler(IRepository<Forms> formRepo, IDatabaseService data)
        {
            _formRepo = formRepo;
            _dbService = data;
        }

        // GET METHOD
        public async Task<List<Forms>> Get()
        {
            DataTable selectResult = await _formRepo.Get();


            if (selectResult is null)
                throw new Exception("There are no forms");


            return selectResult.ConvertDataTableToList<Forms>();
        }


        // GET by Id METHOD
        public async Task<Forms> GetById(int id)
        {
            Forms forms = await _formRepo.GetById(id);

            if (forms is null)
                throw new Exception("Invalid id or no forms");

            return forms;
        }

        // POST METHOD
        public async Task<Forms> Post([FromBody] Forms forms)
        {
            if (string.IsNullOrWhiteSpace(forms.Title.Trim()))
            {
                throw new Exception("The value cannot be null or empty");
            }

            Forms form = await _formRepo.Post(forms);

            if (form is null)
                throw new Exception("Invalid id or no forms");

            return form;
        }


        // DELETE METHOD
        public async Task<Forms> Delete(int id)
        {
            Forms form = await _formRepo.Delete(id);

            if (form is null) 
                throw new Exception("Invalid id");


            return form;
        }

        // PUT METHOD
        public async Task<Forms> Update([FromBody] Forms form, int id)
        {
            if (string.IsNullOrWhiteSpace(form.Title.Trim()))
            {
                throw new Exception("The title cannot be null or empty");
            }

            if (form.Questions.Count is 0)
                throw new Exception("Questions is an mandatory parameter");

            Forms forms = await _formRepo.Update(form, id);

            if (forms is null)
                throw new Exception("Invalid id or no forms");

            return forms;
        }
    }
}
