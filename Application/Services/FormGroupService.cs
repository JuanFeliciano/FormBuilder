using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Repositories;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class FormGroupService : IServices<FormsGroup> 
    {
        private readonly IRepository<FormsGroup> _formGroupRepo;

        public FormGroupService(IRepository<FormsGroup> formGroupRepo) => _formGroupRepo = formGroupRepo;


        // GET METHOD
        public async Task<string> Get()
        {
            DataTable selectResult = await _formGroupRepo.Get();
            string selectJson = ConvertFormat.ConvertDataTableToJson(selectResult);
            if (selectJson is "[]")
            {
                throw new Exception("There are no form groups");
            }

            return selectJson;
        }

        // POST METHOD
        public async Task<string> Post([FromBody] FormsGroup formsGroup)
        {
            if (string.IsNullOrWhiteSpace(formsGroup.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            DataTable insertResult = await _formGroupRepo.Post(formsGroup);
            string insertJson = ConvertFormat.ConvertDataTableToJson(insertResult);

            return insertJson;
        }

        // DELETE METHOD

        public async Task<string> Delete(int id)
        {
            DataTable deleteResult = await _formGroupRepo.Delete(id);
            string deleteJson = ConvertFormat.ConvertDataTableToJson(deleteResult);

            if (deleteJson is "[]")
            {
                throw new Exception("ID parameter doesn't exist");
            }

            return deleteJson;
        }

        // UPDATE METHOD

        public async Task<string> Update([FromBody] FormsGroup formGroup, int id)
        {
            DataTable updateResult = await _formGroupRepo.Update(formGroup, id);
            string updateJson = ConvertFormat.ConvertDataTableToJson(updateResult);

            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            return updateJson;
        }
    }
}
