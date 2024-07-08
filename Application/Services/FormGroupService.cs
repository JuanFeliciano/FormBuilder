using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Utilities;
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
            //List<FormsGroup> selectFormsGroup = selectResult.ConvertDataTableToList<FormsGroup>();
            //if (selectFormsGroup is null)
            //{
            //    throw new Exception("There are no form groups");
            //}

            return selectResult;
        }

        // POST METHOD
        public async Task<List<FormsGroup>> Post([FromBody] FormsGroup formsGroup)
        {
            if (string.IsNullOrWhiteSpace(formsGroup.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            DataTable insertResult = await _formGroupRepo.Post(formsGroup);
            List<FormsGroup> insertFormsGroup = insertResult.ConvertDataTableToList<FormsGroup>();

            return insertFormsGroup;
        }

        // DELETE METHOD

        public async Task<List<FormsGroup>> Delete(int id)
        {
            DataTable deleteResult = await _formGroupRepo.Delete(id);
            List<FormsGroup> deleteFormsGroup = deleteResult.ConvertDataTableToList<FormsGroup>();

            if (deleteFormsGroup is null)
            {
                throw new Exception("ID parameter doesn't exist");
            }

            return deleteFormsGroup;
        }

        // UPDATE METHOD

        public async Task<List<FormsGroup>> Update([FromBody] FormsGroup formGroup, int id)
        {
            DataTable updateResult = await _formGroupRepo.Update(formGroup, id);
            List<FormsGroup> updateFormsGroup = updateResult.ConvertDataTableToList<FormsGroup>();

            if (string.IsNullOrWhiteSpace(formGroup.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            return updateFormsGroup;
        }
    }
}
