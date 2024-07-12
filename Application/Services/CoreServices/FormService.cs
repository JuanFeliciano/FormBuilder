using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;

namespace MovtechForms.Application.Services.MainServices
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

            return selectResult.ConvertDataTableToList<Forms>();
        }


        // GET by Id METHOD
        public async Task<Forms> GetById(int id)
        {
            return await _formRepo.GetById(id);
        }

        // POST METHOD
        public async Task<Forms> Post([FromBody] Forms forms)
        {
            if (string.IsNullOrWhiteSpace(forms.Title.Trim()))
            {
                throw new Exception("The value cannot be null or empty");
            }

            return await _formRepo.Post(forms);
        }


        // DELETE METHOD
        public async Task<Forms> Delete(int id)
        {
            return await _formRepo.Delete(id);
        }

        // PUT METHOD
        public async Task<Forms> Update([FromBody] Forms form, int id)
        {
            if (string.IsNullOrWhiteSpace(form.Title))
            {
                throw new Exception("The title cannot be null or empty");
            }

            return await _formRepo.Update(form, id);
        }


    }
}
