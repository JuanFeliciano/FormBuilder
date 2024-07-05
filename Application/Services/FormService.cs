using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Utilities;
using MovtechForms.Application.Utilities.FormUtils;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class FormService : IServices<Forms>
    {
        private readonly IRepository<Forms> _formRepo;
        private readonly IDatabaseService _dbService;

        public FormService(IRepository<Forms> formRepo, IDatabaseService data) 
        {
            _formRepo = formRepo;
            _dbService = data;
        }

        // GET METHOD
        public async Task<List<Forms>> Get()
        {
            DataTable selectResult = await _formRepo.Get();
            List<Forms> selectForms = selectResult.ConvertDataTableToList<Forms>();


            return selectForms;
        }


        // GET by Id METHOD
        public async Task<List<Forms>> GetById(int id)
        {
            DataTable selectResult = await _formRepo.GetById(id);
            List<Forms> selectForms = selectResult.ConvertDataTableToList<Forms>();

            return selectForms;

        }

        // POST METHOD
        public async Task<List<Forms>> Post([FromBody] Forms forms)
        {
            if (string.IsNullOrWhiteSpace(forms.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            DataTable insertResult = await _formRepo.Post(forms);
            List<Forms> insertForms = insertResult.ConvertDataTableToList<Forms>();

            return insertForms;
        }


        // DELETE METHOD
        public async Task<List<Forms>> Delete(int id)
        {
            DataTable deleteResult = await _formRepo.Delete(id);
            List<Forms> deleteForms = deleteResult.ConvertDataTableToList<Forms>();

            return deleteForms;
        }

        // PUT METHOD
        public async Task<List<Forms>> Update([FromBody] Forms form, int id)
        {
            if (string.IsNullOrWhiteSpace(form.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            DataTable updateResult = await _formRepo.Update(form, id);
            List<Forms> updateForms = updateResult.ConvertDataTableToList<Forms>();

            return updateForms;
        }


    }
}
