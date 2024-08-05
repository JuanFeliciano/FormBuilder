using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Services.MainServices
{
    public class FormGroupService : IFormGroupService
    {
        private readonly IFormGroupHandler _formGroupHandler;

        public FormGroupService(IFormGroupHandler formGroupHandler) => _formGroupHandler = formGroupHandler;


        public async Task<List<FormGroup>> Get()
        {
            return await _formGroupHandler.Get();
        }

            // GET METHOD
            public async Task<FormGroup> GetById(int id)
        {
            return await _formGroupHandler.GetById(id);
        }

        // POST METHOD
        public async Task<FormGroup> Post([FromBody] FormGroup formsGroup)
        {
            return await _formGroupHandler.Post(formsGroup);
        }

        // DELETE METHOD

        public async Task<FormGroup> Delete(int id)
        {
            return await _formGroupHandler.Delete(id);
        }

        // UPDATE METHOD

        public async Task<FormGroup> Update([FromBody] FormGroup formGroup, int id)
        {
            return await _formGroupHandler.Update(formGroup, id);
        }
    }
}
