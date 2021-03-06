function! BuildJS()
  call VimuxRunCommand("time make build")
endfunction

function! BuildCSS()
  call VimuxRunCommand("time make styles")
endfunction

function! BuildCTags()
  call VimuxRunCommand("time make tags")
endfunction

autocmd! BufWritePost *.js   :call BuildJS()
autocmd! BufWritePost *.sass :call BuildCSS()
autocmd! BufWritePost .ctags* :call BuildCTags()
