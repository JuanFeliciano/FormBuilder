using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._1___RepositoryInterfaces._0._0._0._1___CoreInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces.ServicesInterfaces;

namespace MovtechForms._1___Application._0._2___CommandHandler
{
    public class FormHandler : IFormHandler
    {
        private readonly IFormRepository _formRepo;
        private readonly IDatabaseService _dbService;

        public FormHandler(IFormRepository formRepo, IDatabaseService data)
        {
            _formRepo = formRepo;
            _dbService = data;
        }

        // GET METHOD
        public async Task<List<Form>> Get()
        {
            List<Form> selectResult = await _formRepo.Get();


            if (selectResult.Count is 0)
                throw new Exception("There are no forms");


            return selectResult;
        }


        // GET by Id METHOD
        public async Task<Form> GetById(int id)
        {
            Form forms = await _formRepo.GetById(id);

            if (forms is null) 
                throw new Exception("Invalid id or no forms");

            return forms;
        }

        // POST METHOD
        public async Task<Form> Post([FromBody] Form forms)
        {
            if (string.IsNullOrWhiteSpace(forms.Title.Trim()))
                throw new Exception("The value cannot be null or empty");

            Form form = await _formRepo.Post(forms);

            if (form is null)
                throw new Exception("Invalid id or no forms");

            return form;
        }


        // DELETE METHOD
        public async Task<Form> Delete(int id)
        {
            Form form = await _formRepo.Delete(id);

            if (form is null) 
                throw new Exception("Invalid id");


            return form;
        }

        // PUT METHOD
        public async Task<Form> Update([FromBody] Form form, int id)
        {
            if (string.IsNullOrWhiteSpace(form.Title.Trim()))
                throw new Exception("The title cannot be null or empty");

            Form forms = await _formRepo.Update(form, id);

            if (forms is null)
                throw new Exception("Invalid id or no forms");

            return forms;
        }
    }
}
