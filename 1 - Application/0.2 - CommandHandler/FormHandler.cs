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
        private readonly IFormGroupRepository _formGroupRepo;
        private readonly IDatabaseService _dbService;

        public FormHandler(IFormRepository formRepo, IDatabaseService data, IFormGroupRepository formGroupRepo)
        {
            _formRepo = formRepo;
            _dbService = data;
            _formGroupRepo = formGroupRepo;
        }

        // GET METHOD
        public async Task<List<Form>> Get()
        {
            List<Form> selectResult = await _formRepo.Get();



            return selectResult;
        }


        // GET by Id METHOD
        public async Task<Form> GetById(int id)
        {
            List<Form> formList = await _formRepo.Get();

            bool matchingForm = formList.Exists(i => i.Id == id);

            if (matchingForm is false) 
                throw new Exception($"Parameter Id: {id} is invalid");

            Form forms = await _formRepo.GetById(id);

            return forms;
        }

        // POST METHOD
        public async Task<Form> Post([FromBody] Form forms)
        {
            List<FormGroup> formGroupList = await _formGroupRepo.Get();

            bool matchingFormGroup = formGroupList.Exists(i => i.Id == forms.IdGroup);

            if (matchingFormGroup is false)
                throw new Exception($"The IdGroup value: {forms.IdGroup} is invalid");


            if (string.IsNullOrWhiteSpace(forms.Title.Trim()))
                throw new Exception("The value cannot be null or empty");

            Form form = await _formRepo.Post(forms);

            return form;
        }


        // DELETE METHOD
        public async Task<Form> Delete(int id)
        {
            List<Form> formList = await _formRepo.Get();

            bool matchingForm = formList.Exists(i => i.Id == id);

            if (matchingForm is false) 
                throw new Exception("Parameter Id is invalid");


            Form form = await _formRepo.Delete(id);



            return form;
        }

        // PUT METHOD
        public async Task<Form> Update([FromBody] Form form, int id)
        {
            List<FormGroup> listFormGroup = await _formGroupRepo.Get();
            List<Form> listForm = await _formRepo.Get();


            bool matchingForm = listForm.Exists(i => i.Id == id);
            bool matchingFormGroup = listFormGroup.Exists(i => i.Id == form.IdGroup);

            
            if (matchingForm is false)
                throw new Exception($"The Id parameter: {id} is invalid");


            if (matchingFormGroup is false)
                throw new Exception($"The value IdGroup: {form.IdGroup} is invalid");


            if (string.IsNullOrWhiteSpace(form.Title.Trim()))
                throw new Exception("The title cannot be null or empty");

            Form forms = await _formRepo.Update(form, id);

            return forms;
        }
    }
}
