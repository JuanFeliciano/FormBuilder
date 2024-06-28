using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using System.Data;

namespace MovtechForms.Domain.Interfaces
{
    public interface IFormGroupService
    {
        Task<DataTable> GetFormGroup();
        Task<DataTable> PostFormGroup([FromBody] FormsGroup formGroup);
        Task<DataTable> DeleteFormGroup(int id);
        Task<DataTable> UpdateFormGroup([FromBody] FormsGroup formsGroup, int id);
    }
}
