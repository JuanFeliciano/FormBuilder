using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services.MainServices
{
    public class FormGroupService : IServices<FormsGroup>
    {
        private readonly IRepository<FormsGroup> _formGroupRepo;

        public FormGroupService(IRepository<FormsGroup> formGroupRepo) => _formGroupRepo = formGroupRepo;


        public async Task<List<FormsGroup>> Get()
        {
            DataTable selectResult = await _formGroupRepo.Get();

            return selectResult.ConvertDataTableToList<FormsGroup>();
        }

            // GET METHOD
            public async Task<FormsGroup> GetById(int id)
        {
            return await _formGroupRepo.GetById(id);
        }

        // POST METHOD
        public async Task<FormsGroup> Post([FromBody] FormsGroup formsGroup)
        {
            if (string.IsNullOrWhiteSpace(formsGroup.Title.Trim()))
            {
                throw new Exception("The value cannot be null or empty");
            }

            return await _formGroupRepo.Post(formsGroup);
        }

        // DELETE METHOD

        public async Task<FormsGroup> Delete(int id)
        {
            return await _formGroupRepo.Delete(id);
        }

        // UPDATE METHOD

        public async Task<FormsGroup> Update([FromBody] FormsGroup formGroup, int id)
        {
            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            return await _formGroupRepo.Update(formGroup, id);
        }
    }
}
