using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class FormGroupService : IServices<FormsGroup> 
    {
        private readonly IRepository<FormsGroup> _formGroupRepo;

        public FormGroupService(IRepository<FormsGroup> formGroupRepo) => _formGroupRepo = formGroupRepo;


        public async Task<List<FormsGroup>> Get()
        {
            DataTable selectResult = await _formGroupRepo.Get();
            List<FormsGroup> selectFormsGroup = selectResult.ConvertDataTableToList<FormsGroup>();


            return selectFormsGroup;
        }

        // GET METHOD
        public async Task<FormsGroup> GetById(int id)
        {
            FormsGroup selectResult = await _formGroupRepo.GetById(id);

            return selectResult;
        }

        // POST METHOD
        public async Task<FormsGroup> Post([FromBody] FormsGroup formsGroup)
        {
            if (string.IsNullOrWhiteSpace(formsGroup.Title.Trim()))
            {
                throw new Exception("The value cannot be null or empty");
            }

            FormsGroup insertResult = await _formGroupRepo.Post(formsGroup);

            return insertResult;
        }

        // DELETE METHOD

        public async Task<FormsGroup> Delete(int id)
        {
            FormsGroup deleteResult = await _formGroupRepo.Delete(id);

            return deleteResult;
        }

        // UPDATE METHOD

        public async Task<FormsGroup> Update([FromBody] FormsGroup formGroup, int id)
        {
            FormsGroup updateResult = await _formGroupRepo.Update(formGroup, id);

            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            return updateResult;
        }
    }
}
