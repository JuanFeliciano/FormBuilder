using Microsoft.AspNetCore.Mvc;
using MovtechForms.Application.Repositories;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services
{
    public class FormService : IServices<Forms>
    {
        private readonly IRepository<Forms> _formRepo;

        public FormService(IRepository<Forms> formRepo) => _formRepo = formRepo;

        // GET METHOD
        public async Task<string> Get()
        {
            DataTable selectResult = await _formRepo.Get();
            string selectJson = ConvertFormat.ConvertDataTableToJson(selectResult);

            return selectJson;

        }

        // POST METHOD
        public async Task<string> Post([FromBody] Forms forms)
        {
            if (string.IsNullOrWhiteSpace(forms.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            DataTable insertResult = await _formRepo.Post(forms);
            string insertJson = ConvertFormat.ConvertDataTableToJson(insertResult);

            return insertJson;
        }


        // DELETE METHOD
        public async Task<string> Delete(int id)
        {
            DataTable deleteResult = await _formRepo.Delete(id);
            string deleteJson = ConvertFormat.ConvertDataTableToJson(deleteResult);

            return deleteJson;
        }

        // PUT METHOD
        public async Task<string> Update([FromBody] Forms form, int id)
        {
            if (string.IsNullOrWhiteSpace(form.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            DataTable updateResult = await _formRepo.Update(form, id);
            string updateJson = ConvertFormat.ConvertDataTableToJson(updateResult);

            return updateJson;
        }


    }
}
