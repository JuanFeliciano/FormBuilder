using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Services.MainServices
{
    public class FormService : IFormService
    {
        private readonly IFormHandler _formHandler;

        public FormService(IFormHandler formHandler) => _formHandler = formHandler;

        // GET METHOD
        public async Task<List<Forms>> Get()
        {
            return await _formHandler.Get();
        }


        // GET by Id METHOD
        public async Task<Forms> GetById(int id)
        {
            return await _formHandler.GetById(id);
        }

        // POST METHOD
        public async Task<Forms> Post([FromBody] Forms forms)
        {
            return await _formHandler.Post(forms);
        }


        // DELETE METHOD
        public async Task<Forms> Delete(int id)
        {
            return await _formHandler.Delete(id);
        }

        // PUT METHOD
        public async Task<Forms> Update([FromBody] Forms form, int id)
        {
            return await _formHandler.Update(form, id);
        }
    }
}
