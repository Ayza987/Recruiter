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

        
        if (!$cv->move('uploads/cv')) {
            return response()->json(['message' => 'Erreur lors du déplacement du CV']);
        }else{
            return response()->json(['message' => 'Fichiers téléchargés avec succès']);
        }
        
    }
}
