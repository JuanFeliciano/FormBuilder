using System.Data;

namespace MovtechForms.Application
{
    public static class ConvertFormat
    {
        public static string ConvertDataTableToJson(DataTable dataTable)
        {
            if (dataTable == null)
            {
                return string.Empty;
            }

            return Newtonsoft.Json.JsonConvert.SerializeObject(dataTable, Newtonsoft.Json.Formatting.Indented);
        }

    }
}
