using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Net.Http.Headers;

namespace FileServer.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        const string DIR = @"C:\Users\ibrahim\Desktop";

        [HttpPut("{filename}")]
        public void Upload(string filename)
        {
            var savePath = Path.Combine(DIR, filename);

            using (var bodyReader = new StreamReader(HttpContext.Request.Body))
            using (var fileStream = new FileStream(savePath, FileMode.Create))
            {
                bodyReader.BaseStream.CopyTo(fileStream);
            }
        }

        [HttpGet]
        [Route("download")]
        public IActionResult Download([FromQuery] string filename)
        {
            var getPath = Path.Combine(DIR, filename);
            return new PhysicalFileResult(getPath, "image/jpeg");
        }
    }
}
