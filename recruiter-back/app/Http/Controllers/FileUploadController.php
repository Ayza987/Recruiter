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

        if ($cv) {
            $this->storeFile($cv, 'uploads/cv');
        }
        if ($lettre_motivation) {
            $this->storeFile($lettre_motivation, 'uploads/lettre_motivation');
        }
        if ($diplomes) {
            $this->storeFile($diplomes, 'uploads/diplomes');
        }

        return response()->json(['message' => 'Fichiers téléchargés avec succès']);
    }

    private function storeFile($file, $destinationPath)
    {
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $filename = pathinfo($originalName, PATHINFO_FILENAME) . '.' . $extension;

        if (!file_exists(public_path($destinationPath))) {
            mkdir(public_path($destinationPath), 0755, true);
        }


        $file->move(public_path($destinationPath), $filename);
    }

}
