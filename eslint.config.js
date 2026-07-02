import js from '@eslint/js';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
export default [js.configs.recommended,{ignores:['dist']},{files:['**/*.{js,jsx}'],languageOptions:{ecmaVersion:2023,sourceType:'module',globals:{window:'readonly',document:'readonly',localStorage:'readonly',crypto:'readonly',AudioContext:'readonly',navigator:'readonly',location:'readonly'}},plugins:{'react-hooks':hooks,'react-refresh':refresh},rules:{...hooks.configs.recommended.rules,'no-unused-vars':['warn',{argsIgnorePattern:'^_'}]}}];
