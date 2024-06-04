<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $cv = $request->file('cv');
        $lettre_motivation = $request->file('lettre_motivation');
        $diplomes = $request->file('diplomes');

        $cv->move('uploads/cv');
        $lettre_motivation->move('uploads/lettre_motivation');  
        $diplomes->move('uploads/diplomes');

        return response()->json(['message' => 'Fichiers téléchargés avec succès']);
    }
}
