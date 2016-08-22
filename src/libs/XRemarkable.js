import Remarkable from 'remarkable';
import md5 from 'md5';

function todo(md) {
  function parse(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    if (pos + 3 > max) { return false; }
    let result = /^\[( |x)\] (.*)/.exec(state.src.slice(pos, max));
    if (silent || !result) {
      return !!result;
    }

    const todos = [{mark: result[1], content: result[2]}];
    const test = state.tShift[startLine] > 0 ? /^\s+\[( |x)\] (.*)/ : /^\[( |x)\] (.*)/;
    let nextLine = startLine;
    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      result = test.exec(state.src.slice(state.bMarks[nextLine], state.eMarks[nextLine]));
      if (!result) {
        break;
      }
      todos.push({mark: result[1], content: result[2]});
    }

    state.line = nextLine;
    state.tokens.push({
      type: 'todo',
      todos,
      isShift: state.tShift[startLine] > 0,
      lines: [ startLine, state.line ],
      level: state.level,
    });
    return true;
  }

  function render(tokens, id, options, env) {
    let result = '<ul class="todo">\n';
    tokens[id].todos.forEach((todo) => {
      const checkdClass = todo.mark === ' ' ? 'unchecked' : 'checked';
      result = `${result}<li class="${checkdClass}">${todo.content}</li>\n`;
    });
    if (tokens[id].isShift) {
      result = `<blockquote>\n${result}</ul></blockquote>`
    } else {
      result += '</ul>';
    }
    return result;
  }

  md.block.ruler.before('paragraph', 'todo', parse, {alt: []});
  md.renderer.rules.todo = render;
}

const XRemarkable = new Remarkable({
  xhtmlOut: true,
  breaks: true,
});
XRemarkable.use(todo);
XRemarkable.renderer.rules.fence_custom = {
  xscript(tokens, idx/*, options, env, instance */) {
    const reg = /[^(]*(?:\((\S*)\))?(?:\[(\d*%?)x(\d*%?)\])/;
    let result = reg.exec(tokens[idx].params);
    if (!result) {
      window.console.log(`${tokens[idx].params.replace(/(^\s*)|(\s*$)/g, '')}[100%x200]`);
      result = reg.exec(`${tokens[idx].params.replace(/(^\s*)|(\s*$)/g, '')}[100%x200]`);
    }
    let src = '';
    if (result[1]) {
      src = `src='${result[1]}'`;
    } else {
      src = `srcdoc='${tokens[idx].content}'`;
    }
    const iframeId = md5(src);
    return `<div style='width: ${result[2]}; height: 1em; text-align: right;'><a href='javascript:void(0)' onclick='var frame = document.getElementById("${iframeId}"); if (frame.contentWindow) {frame.contentWindow.location.reload();} else {frame.window.location.reload();}'>reload</a></div><iframe id='${iframeId}' width='${result[2]}' height='${result[3]}' frameborder='0' ${src}></iframe>`;
  },
};

export default XRemarkable;